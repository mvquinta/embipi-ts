/*
 general costume hooks saved as general utilities.
 to be used whatever I might need them and also to help and separate concerns
*/

export const useUtils = () => {
    const ageInMonths = (startDate: Date) => {
        const startDateString = startDate.toLocaleString()
        const endDate = new Date()

        const monthDiff =
            endDate.getMonth() -
            parseInt(startDateString.split('-')[1]) +
            12 *
                (endDate.getFullYear() -
                    parseInt(startDateString.split('-')[0]))
        return monthDiff
    }

    const getPercentilValue = (submitedAge: any, submitedPercentil: any) => {
        const percentilValueHolder: any = []
        if (
            //checks if variables are valid. If not return empty array
            typeof submitedAge === 'number' &&
            typeof submitedPercentil === 'number'
        ) {
            for (let i = 0; i < submitedAge - 1; i++) {
                percentilValueHolder.push(null)
            }
            percentilValueHolder.push(submitedPercentil)
            return percentilValueHolder
        } else {
            return percentilValueHolder
        }
    }

    const getMonthToShow = (child: any) => {
        let monthToShow = null
        if (child) {
            switch (true) {
                case child[0].userBabyMonths <= 2:
                    monthToShow = 'monthtwo'
                    break
                case child[0].userBabyMonths <= 4:
                    monthToShow = 'monthfour'
                    break
                case child[0].userBabyMonths <= 6:
                    monthToShow = 'monthsix'
                    break
                case child[0].userBabyMonths <= 9:
                    monthToShow = 'monthnine'
                    break
                case child[0].userBabyMonths <= 12:
                    monthToShow = 'monthtwelve'
                    break
                case child[0].userBabyMonths <= 18:
                    monthToShow = 'montheighteen'
                    break
                case child[0].userBabyMonths <= 24:
                    monthToShow = 'monthtwentyfour'
                    break
                default:
                    console.log('We did not found milestones for your baby age')
            }
        }
        return monthToShow
    }

    return {
        ageInMonths,
        getPercentilValue,
        getMonthToShow,
    }
}
