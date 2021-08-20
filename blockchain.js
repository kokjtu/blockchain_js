const Block = require('./block')

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 2
    }

    createGenesisBlock() {
        const genesisDate = '04/07/1999'
        return new Block('Genesis Block', 0, genesisDate, '0')
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1]
    }

    addNewBlock(newBlock) {
        newBlock.prevHash = this.getLastBlock().hash
        newBlock.index = this.getLastBlock().index + 1
        // newBlock.hash = newBlock.calculateHash()
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock)
    }

    isChainValid() {
        const chain = this.chain;

        for (let i = 0; i < chain.length; i++) {

            if (chain[i].hash !== chain[i].calculateHash()) {
                console.log(`Block ${i} has been corrupted`)
                return false
            }

            if (i > 0 && chain[i].prevHash !== chain[i - 1].hash) {
                console.log(`Block ${i -1} has been corruted`)
                return false
            }
        }

        console.log('Chain is valid')
        return true
    }
}

let blocksToAdd = 5

const PolyChain = new Blockchain()

for (i = 0; i < blocksToAdd; i++) {
    PolyChain.addNewBlock(new Block({sender: 'Polycode', receiver: 'Youtube', message: `Block ${PolyChain.chain.length} has been added to the chain`}))
}

// console.log(PolyChain.isChainValid())

// PolyChain.chain[3].data = {
//     sender: 'Polycode',
//     receiver: 'Youtube',
//     message: 'This block has been tampered with'
// }

PolyChain.chain.forEach(block => {
    console.log(block)
    // console.log(block.calculateHash())
})

// console.log(PolyChain.isChainValid())