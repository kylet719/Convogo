import React from 'react'

const Members = ({memberList}) => {
  return (
    <>
    {memberList.map( (member) => 
        <div className="member" style={{display: "flex"}}>
          <img src={member.picture} width={25} alt="Profile Pic" /><p1>{member.name}</p1>
        </div>
    )}
    </>
  )
}

export default Members