class Update {
    constructor(payload, nextUpdate) {
        this.payload = payload
        this.nextUpdate = nextUpdate        
    }
}

// 单链表
class UpdateQueue {
    constructor() {
        this.baseState = null; // 原状态
        this.firstUpdate = null; // 第一个更新
        this.lastUpdate = null; // 最后一个更新
    }

    enqueueUpdate(update) {
        if (this.firstUpdate == null) {
            this.firstUpdate = this.lastUpdate = update;
        } else {
            this.lastUpdate.nextUpdate = update
            this.lastUpdate = update
        }
    }

    // 获取老状态，然后遍历这个链表，进行更新
    forceUpdate() {
        let currentState = this.baseState || {number: 0}
        let currentUpdate = this.firstUpdate
        while(currentUpdate) {
            let nextState = typeof currentUpdate.payload === 'function' ? 
                            currentUpdate.payload(currentState) : currentUpdate.payload;
            // 使用当前更新得到新的状态
            currentState = {...currentState, ...nextState}
            currentUpdate = currentUpdate.nextUpdate
        }

        // 更新完之后要把链表清空？
        this.firstUpdate = this.lastUpdate = null
        this.baseState = currentState

        return this.baseState
    }
}   

export {Update, UpdateQueue}