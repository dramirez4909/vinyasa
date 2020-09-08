import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './WelcomePage.css'

export default function WelcomePage(){
    const firstName = useSelector(state=> state.auth.firstName)
    return (
        <>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center",marginLeft:"150px",marginTop:"40px",maxWidth:"900px"}}>
                <img style={{
                    minWidth: "160px", width: "160px", height: "160px", minHeight: "160px"
                }} src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/1ea329a1e2cddd2d5a0f6310422eb2e5a987fdef/two_people_waving.svg" />
                <div>
                    <div className={"HomeTeamLeadWelcomeMessage-header"}>Hello, {firstName}!</div>
                    <p>Welcome to Vinyasa! This is your home page, where you can quickly see your upcoming tasks and access your most important projects.</p>
                </div>
            </div>
        </>
    )
}