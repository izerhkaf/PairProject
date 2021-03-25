class Helper{
    static getDate(dates){
        let date = dates.getDate()
        let month = dates.getMonth()+1
        let year = dates.getFullYear()
        return `${date}-${month}-${year}`
    }

    static getAge(dates){
        let birthYear = dates.getFullYear()
        let year = new Date().getFullYear()
        return (year - birthYear)
    }

    static changeStatus(status){
        if(status === false){
            return "Pending"
        }
        return "Finished"
    }
}

module.exports = Helper