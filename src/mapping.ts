import { BigInt } from "@graphprotocol/graph-ts"
import { XYO, Transfer, Burn } from "../generated/XYO/XYO"
import { _Transfer, _Burn } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
    let entity = _Transfer.load(event.params.value.toHex())

    if (entity == null) {
        entity = new _Transfer(event.params.value.toHex())
        entity.count = BigInt.fromI32(0)
    }

    entity.count = entity.count + BigInt.fromI32(1)
    entity._from = event.params.from
    entity._to = event.params.to
    entity._value = event.params.value
    entity.save()
}

export function handleBurn(event: Burn): void {
    let entity = _Burn.load(event.transaction.from.toHex())

    if (entity == null) {
        entity = new _Burn(event.transaction.from.toHex())

        entity.count = BigInt.fromI32(0)
    }

    // BigInt and BigDecimal math are supported
    entity.count = entity.count + BigInt.fromI32(1)

    entity._from = event.params.from
    entity._value = event.params.value

    // Entities can be written to the store with `.save()`
    entity.save()

}
