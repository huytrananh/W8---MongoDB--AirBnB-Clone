import React, { useState, useEffect } from 'react'

export const ExperiencesList = () => {
    const [experiences, setExperiences] = useState([])

    const getExperienceList = async() => {
        let url = 'http://localhost:5000/experiences'
        let data = await fetch(url)
        let result = await data.json()
        console.log(result)
        setExperiences(result.data)
        
    }

    useEffect(() => {
        getExperienceList()
    }, [])

    if(experiences === null){
        return(<div>Not found</div>)
    }

    return (
        <div>
            <h1>Experiences</h1>
            { experiences.map( e => <Experience {...e} />) }
        </div>
    )
}

const Experience = ({title, pictureUrl, country, duration, price, groupSize, items, tags, description}) =>
<div>
    <h2>{title}</h2>
    <img src={pictureUrl} />
    <h3>{country}</h3>
    <h4>Starting from ${price}</h4>
    <h4>{duration} hour</h4>
    <h4>Up to {groupSize} people</h4>
    <h4>{items.map(e => <h5>{e}</h5>)}</h4>
    <h4>{tags.map(e => <h5>{e.tag}</h5>)}</h4>
    <h4>{description}</h4>
</div> 

export default ExperiencesList