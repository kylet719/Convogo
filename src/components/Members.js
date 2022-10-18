import React from 'react'

const Members = ({memberList, isOwner, currentUser, uninvite}) => {
  return (
    <>
    {memberList.map( (member) => 
        <div className="member" style={{display: "flex"}}>
          <img src={member.picture} width={25} alt="Profile Pic" /><p1>{member.name}</p1>
          {isOwner && member.googleId !== currentUser? 
          (<button className='btn mt-1 btn-outline btn-circle btn-error btn-xs float-right' onClick = {()=> uninvite(member.googleId)} >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>): 
          ""}
        </div>
    )}
    </>
  )
}

export default Members