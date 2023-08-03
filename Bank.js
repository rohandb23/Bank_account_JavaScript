class Bank{
    static bankId = 0
    constructor(bankName){
        this.bankId = Bank.bankId++
        this.bankName = bankName
        this.accountsInBank = []
    }

    getBankId(){
        return this.bankId
    }

    updateBankName(newValue){
        return this.bankName = newValue
    }
}

module.exports = Bank