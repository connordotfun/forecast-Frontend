import { observable, action } from 'mobx'

// tslint:disable no-console
export class CardExpandedStore {
    @observable $expandedCards: Map<string, boolean> = new Map()

    @action
    public toggleExpanded(id: string) {
        this.$expandedCards.set(id, !this.$expandedCards.get(id))
    }

    public getExpanded(id: string) {
        return this.$expandedCards.get(id)
    }
}

export default new CardExpandedStore()