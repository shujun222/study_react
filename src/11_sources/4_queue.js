class Update {
    constructor(payload) {
        this.payload = payload
        this.nextUpdate = null        
    }
}

class UpdateQueue {
    constructor() {
        this.baseState = {}; // 原状态, 最终的state存储
        // 每一次setState都会先串成一个链表，最后统一forceUpdate把结果更新到baseState中
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
        let currentUpdate = this.firstUpdate
        while(currentUpdate) {
            let nextState = typeof currentUpdate.payload === 'function' ? 
                            currentUpdate.payload(this.baseState) : currentUpdate.payload;
            // 使用当前更新得到新的状态
            this.baseState = {...this.baseState, ...nextState}
            currentUpdate = currentUpdate.nextUpdate
        }

        // 更新完之后要把链表清空？ 嗯，对的。
        this.firstUpdate = this.lastUpdate = null
        return this.baseState
    }
}   



// 计数器number: 0;  setState({number: 1}) setState(state => ({number: state.number+1}))
let queue = new UpdateQueue()
queue.enqueueUpdate(new Update({name: 'sbjun'}))
queue.enqueueUpdate(new Update({number: 0}))
queue.enqueueUpdate(new Update(state => ({number: state.number+1})))
queue.enqueueUpdate(new Update(state => ({number: state.number+1})))
queue.forceUpdate()
console.log(queue.baseState);
