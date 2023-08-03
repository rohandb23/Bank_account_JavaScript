const Account = require("./Account")
const Bank = require("./Bank")
const ValidationError = require("./ValidationError")
const UnauthorizedError = require("./UnAuthorizedError")
const NotFound = require("./NotFound")
class User{
    static userId = 0
    static allUsers =[]
    static allBanks = []
    constructor(fullName, age, gender, isAdmin){
        this.Id = User.userId++
        this.fullName = fullName
        this.age = age
        this.gender = gender
        this.isAdmin = isAdmin
        this.accounts = []
    }

    getId(){
        return this.Id
    }

    getAccount(){
        return this.accounts
    }

    updateFullName(newValue){
        return this.fullName = newValue
    }

    updateAge(newValue){
        return this.age =newValue
    }

    updateGender(newValue){
        return this.gender = newValue
    }

    newUser(fullName, age, gender){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("you are not admin")
            }
            if(typeof fullName != "string"){
                throw new ValidationError("full name not valid")
            }
            if(typeof age != "number"){
                throw new ValidationError("age not valid")
            }
            if(typeof gender != "string"){
                throw new ValidationError("gender not valid")
            }
            let userObj = new User(fullName, age, gender, false)
            User.allUsers.push(userObj)
            return userObj
        } 
        catch (error) {
            return error
        }
    }

    static newAdmin(fullName, age, gender){
        try {
            if(typeof fullName != "string"){
                throw new ValidationError("full name not valid")
            }
            if(typeof age != "number"){
                throw new ValidationError("age not valid")
            }
            if(typeof gender != "string"){
                throw new ValidationError("gender not valid")
            }
            return new User(fullName, age, gender, true)
        } 
        catch (error) {
            return error
        }
    }

    newBank(bankName){
        try {   
            if(!this.isAdmin){
                throw new UnauthorizedError("you are not admin")
            }
            if(typeof bankName != "string"){
                throw new ValidationError("bank name not valid")
            }
            let bankObj = new Bank(bankName)
            User.allBanks.push(bankObj)
        }
        catch (error) {
            return error
        }
    }

    findBank(bankId){
        try {
            if(typeof bankId != "number"){
                throw new ValidationError("bank ID not valid")
            }
            for (let index = 0; index < User.allBanks.length; index++) {
                if(bankId == User.allBanks[index].getBankId()){
                    return index
                }
            }
            throw new NotFound("bank ID not found")
        } 
        catch (error) {
            throw error  
        }
    }

    updateBank(bankId, newValue){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("you are not admin")
            }
            if(typeof bankId != "number"){
                throw new ValidationError("user ID not valid")
            }
            if(typeof newValue != "string"){
                throw new ValidationError("bank name not valid")
            }
            let indexOfBank = this.findBank(bankId)
            User.allBanks[indexOfBank].updateBankName(newValue)
            return User.allBanks
        } catch (error) {
            return error
        }
    }

    deleteBank(bankId){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("you are not admin")
            }
            if(typeof bankId != "number"){
                throw new ValidationError("user ID not valid")
            }
            let indexOfBank = this.findBank(bankId)
            User.allBanks.splice(indexOfBank, 1)
            return User.allBanks
        } catch (error) {
            return error
        }
    }

    findUser(userId){
        try {
            if(typeof userId != "number"){
                throw new ValidationError("user ID not valid")
            }
            for (let index = 0; index < User.allUsers.length; index++) {
                if(userId == User.allUsers[index].getId()){
                    return index
                }
            }
            throw new NotFound("User ID not found")
        } 
        catch (error) {
            throw error  
        }
    }

    getAllUser(){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("you are not admin")
            }
            return User.allUsers
        } catch (error) {
            return error
        }
    }

    updateUser(userId, parameter, newValue){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("you are not admin")
            }
            if(typeof userId != "number"){
                throw new ValidationError("user ID not valid")
            }
            let indexOfUser = this.findUser(userId)
            switch (parameter) {
                case "fullName": if (typeof newValue != "string") { throw new ValidationError("full name not valid") }
                    User.allUsers[indexOfUser].updateFullName(newValue)
                    return User.allUsers[indexOfUser]
                case "age": if (typeof newValue != "number") { throw new ValidationError("age not valid") }
                    User.allUsers[indexOfUser].updateAge(newValue)
                    return User.allUsers[indexOfUser]
                case "gender": if (typeof newValue != "string") { throw new ValidationError("gender not valid") }
                    User.allUsers[indexOfUser].updateGender(newValue)
                    return User.allUsers[indexOfUser]
                default: throw new NotFound("parameter not found")
            }
        } catch (error) {
            return error   
        }
    }

    deleteUser(userId){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("you are not admin")
            }
            if(typeof userId != "number"){
                throw new ValidationError("user ID not valid")
            }
            let indexOfUser = this.findUser(userId)
            User.allUsers.splice(indexOfUser, 1)
            return User.allUsers
        } catch (error) {
            return error
        }
    }

    createAccount(bankId, balance){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("you are not user")
            }
            if(typeof balance != "number"){
                throw new ValidationError("balance not valid")
            }
            if(typeof bankId != "number"){
                throw new ValidationError("bank ID not valid")
            }
            let createdAccount = new Account(balance)
            this.accounts.push(createdAccount)
            let indexOfBank = this.findBank(bankId)
            User.allBanks[indexOfBank].accountsInBank.push(createdAccount)
            return this.accounts
        } catch (error) {
            return error
        }
    }

    findAccount(accountId){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("you are not user")
            }
            if(typeof accountId != "number"){
                throw new ValidationError("account ID not valid")
            }
            for (let index = 0; index < this.accounts.length; index++) {
                if(accountId == this.accounts[index].getAccountId()){
                    return index
                }
            }
            throw new NotFound("account ID not Found")
        } catch (error) {
            throw error   
        }
    }

    getAllAccount(){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("you are not user")
            }
            return this.accounts
        } catch (error) {
            return error
        }
    }

    deleteAccount(accountId){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("you are not user")
            }
            if(typeof accountId != "number"){
                throw new ValidationError("account ID not valid")
            }
            let indexOfAccount = this.findAccount(accountId)
            this.accounts.splice(indexOfAccount, 1)
            return this.accounts
        } catch (error) {
            return error
        }
    }

    deposit(accountId, amount){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("you are not user")
            }
            if(typeof accountId != "number"){
                throw new ValidationError("account ID not valid")
            }
            let indexOfAccount = this.findAccount(accountId)
            this.accounts[indexOfAccount].deposit(amount)
            return this.accounts
        } 
        catch (error) {
            return error
        }
    }

    withdraw(accountId, amount){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("you are not user")
            }
            if(typeof accountId != "number"){
                throw new ValidationError("account ID not valid")
            }
            let indexOfAccount = this.findAccount(accountId)
            this.accounts[indexOfAccount].withdraw(amount)
            return this.accounts
        } 
        catch (error) {
            return error
        }
    }

    findReceiverAccount(obj, accountId){
        try {
            if(obj.isAdmin){
                throw new UnauthorizedError("you are not user")
            }
            if(typeof accountId != "number"){
                throw new ValidationError("receiver account ID not valid")
            }
            for (let index = 0; index < obj.accounts.length; index++) {
                if(accountId == obj.accounts[index].id){
                    return index
                }
            }
            throw new NotFound("receiver account not found")
        } catch (error) {
            throw error
        }
    }

    transfer(amount, fromAccoutId, receiverUserId, receiverAccountId){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("you are not user")
            }
            let indexOfReceiver = this.findUser(receiverUserId) 
            let findingAccount = User.allUsers[indexOfReceiver]
            let indexOfReceiverAccount = this.findReceiverAccount(findingAccount, receiverAccountId)
            let indexOfSenderAccount = this.findAccount(fromAccoutId)
            this.accounts[indexOfSenderAccount].withdraw(amount)
            findingAccount.accounts[indexOfReceiverAccount].deposit(amount)
            return this.accounts
        } 
        catch (error) {
            return error
        }
    }

    getPassBook(accountId){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("you are not user")
            }
            if(typeof accountId != "number"){
                throw new ValidationError("Account ID not valid")
            }
            let indexOfPassBook = this.findAccount(accountId)
            return this.accounts[indexOfPassBook].getPassBook()
        } 
        catch (error) {
            return error
        }
    }

    getNetworth(userId){
        try {
            if(typeof userId != "number"){
                throw new ValidationError("user ID not valid")
            }
            let indexOfUser = this.findUser(userId)
            let userAccounts = User.allUsers[indexOfUser].getAllAccount()
            let netWorth = 0
            for (let index = 0; index < userAccounts.length; index++) {
                netWorth = netWorth + userAccounts[index].getBalance()      
            }
            return netWorth
        } 
        catch (error) {
            return error
        }
    }

    getAccountsInBank(bankId){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("you are not admin")
            }
            if(typeof bankId != "number"){
                throw new ValidationError("user ID not valid")
            }
            let indexOfBank = this.findBank(bankId)
            return User.allBanks[indexOfBank]
        } catch (error) {
            return error
        }
    }
}


let a = User.newAdmin("rohan", 23, "M")
let u1 = a.newUser("sarv", 21, "M")
let u2 = a.newUser("omkar", 21, "M")
let b1 = a.newBank("sbi")
let b2 = a.newBank("icici")

u1.createAccount(0, 10000)
u1.createAccount(1, 50000)
console.log("U1 account after creating account");
console.log(u1.getAllAccount());
console.log("---------------------------------------------------");
u1.deposit(0, 5000)
console.log("U1 account after depositing money in account");
console.log(u1.getAllAccount());
console.log("---------------------------------------------------");

// u1.withdraw(0, 10000)

// console.log(u1.getPassBook(0));

u2.createAccount(0, 15000)
console.log("U2 account after creating account");
console.log(u2.getAllAccount());
console.log("---------------------------------------------------");
u2.transfer(5000, 2, 1, 0)
console.log("total bank acccounts in bank 1");
console.log(a.getAccountsInBank(0));
console.log("---------------------------------------------------");
console.log("U1 Account 1 passbook");
console.log(u1.getPassBook(0));
console.log("---------------------------------------------------");
console.log("U2 Account 1 passbook");
console.log(u2.getPassBook(2));
console.log("---------------------------------------------------");
console.log("networth of u1 : ", u1.getNetworth(1))
console.log("networth of U2 : ", u2.getNetworth(2));
console.log("---------------------------------------------------");
// console.log("this is user 2");

// //console.log(u2.getAllAccount());

// console.log(u2.getPassBook(4));


// console.log("networth of U1 : ", a.getNetworth(1));

//console.log(a.getAccountsInBank(0));

// // console.log(a.getAllUser());

// u1.createAccount(10000)
// // u1.createAccount(15000)

// console.log(u1.getAccount());

// u1.deposit(0, 5000)

// console.log(u1.getAccount());

// u1.deposit(0, 10000)

// console.log(u1.getAccount());

// u1.withdraw(0, 10000)

// console.log(u1.getAccount());

// console.log(u1.getPassBook(0));

// a.updateUser(1, "fullName", "hemant")
// console.log(a.getAllUser());
// console.log(a);
// console.log(u1);
// console.log(u2);