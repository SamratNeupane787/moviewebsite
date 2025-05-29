"use client"
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'

function SinglePage() {
  const params= useParams()
  const {id} = params
  return (
    <div>
      my id is {id}
    </div>
  )
}

export default SinglePage

