import * as SchoolDAO from '../School/SchoolDAO.js'
import * as DormDAO from '../Dorm/DormDAO.js';
import { XMLHttpRequest } from 'xmlhttprequest'

const apikey = 'fSzDjwihRnUja4UZqUEukfu378SxrvdrqgKj0eu0'

const sameBySubstring = (idx, target, option) => {
    for (let i = 0; i < idx + 1; i++) {
        const testTarget = target.substring(i, target.length - idx + i).toLowerCase()
        const testOption = option.toLowerCase()
        if (testOption.includes(testTarget)) {
            return true
        }
    }
    return false
}

const dormNotInList = (name, dormList) => {
    for (let i = 0; i < dormList.length; i++) {
        if (dormList[i].name == name) {
            return false
        }
    }
    return true
}

const convertToSchools = (schoolsDict) => {
    let newSchools = []
    for (let i = 0; i < schoolsDict.length; i++) {
        let newSchool = {
            name: schoolsDict[i]["school.name"],
            stats: {
                size: schoolsDict[i]["2020.student.size"],
                cost: schoolsDict[i]["school.tuition_revenue_per_fte"],
                ownership: schoolsDict[i]["school.ownership"]
            },
            location: {
                city: "unknown",
                state: "unknown",
                street: "unknown",
                zip: "unknown"
            },
            description: 'A school gathered form the College Scorecards API',
            _id: "Scorecard-ID"
        }
        newSchools.push(newSchool)
    } 
    return newSchools
}


async function getScoreCardSchools(search) {
    const baseurl = 'https://api.data.gov/ed/collegescorecard/v1/schools.json?'
    search = search.split(' ').join('%20')
    const nameQueryInit = 'school.name='
    const nameQuery = nameQueryInit.concat(search)
    const fields = '_fields=school.name,2020.student.size,school.tuition_revenue_per_fte' //Add more here
    const requestURL = baseurl.concat(nameQuery, '&', fields, '&', "api_key=", apikey)
    const response = await fetch(requestURL)
    var data = await response.json();
    return data.results
}


const findSearchSchools = async (req, res) => {
    console.log('hit')
    const search = req.params.name
    const ourSchools = await SchoolDAO.findSchools()
    const scorecardSchoolsDict = await getScoreCardSchools(search)
    const scorecardSchools = convertToSchools(scorecardSchoolsDict)
    let sortedSchools = []

    for (let i = 0; i < search.length; i++) {
        for (let j = 0; j < ourSchools.length; j++) {
            if (sameBySubstring(i, search, ourSchools[j].name)) {
                if (dormNotInList(ourSchools[j].name, sortedSchools)) {
                    sortedSchools.push(ourSchools[j])
                }
            }
        }
        for (let j = 0; j < scorecardSchools.length; j++) {
            if (sameBySubstring(i, search, scorecardSchools[j].name)) {
                if (dormNotInList(scorecardSchools[j].name, sortedSchools)) {
                    sortedSchools.push(scorecardSchools[j])
                }
            }
        }
    }
    console.log(sortedSchools)
    res.json(sortedSchools)
}

const findSearchDorms = async (req, res) => {
    const fullDorms = await DormDAO.findDorms()
    let sortedDorms = []
    const searchTitle = req.params.name
    for (let i = 0; i < searchTitle.length; i++) {
        for (let j = 0; j < fullDorms.length; j++) {
            if (sameBySubstring(i, searchTitle, fullDorms[j].name)) {
                if (dormNotInList(fullDorms[j].name, sortedDorms)) {
                    sortedDorms.push(fullDorms[j])
                }
            }
        }
    }
    const resDorms = sortedDorms.slice(0, 6)
    res.json(resDorms)
}

const SearchController = (app) => {
    app.get('/api/results/dorms/:name', findSearchDorms);
    app.get('/api/results/schools/:name', findSearchSchools)
}

export default SearchController;