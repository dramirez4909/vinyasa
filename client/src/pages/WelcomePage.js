import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function WelcomePage(){
    const username = useSelector(state=> state.auth.username)
    return (
        <>
    <h1>Hello, {username}</h1>
            <img style={{
                minWidth: "160px", width: "160px", height: "160px", minHeight: "160px"}}src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/1ea329a1e2cddd2d5a0f6310422eb2e5a987fdef/two_people_waving.svg"/>
    </>
    )
}