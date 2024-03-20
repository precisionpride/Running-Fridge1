import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetBeverageQuery } from '../app/fridgeSlice'
import { BrowserRouter as Router } from 'react-router-dom'

const Beverage = () => {
    const { item_id } = useParams()
    const { data, isLoading, isError } = useGetBeverageQuery(item_id)
    console.log({data})

    if (isLoading) return <>Loading...</>


    return (
        <div>
            <div className="row">
                <div className="col-8">
                    <h1>
                        Beverages
                    </h1>
                </div>
                <div>
                    <p>
                        {data.name}
                        {data.cost}
                        {data.store_name}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Beverage
