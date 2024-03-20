import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { useGetAllProduceQuery, useDeleteProduceMutation, useCreateProduceMutation } from '../app/fridgeSlice'
import { deleteItem } from '../app/itemSlice'
import { Link } from 'react-router-dom'

function ProduceList() {
    const { data, isLoading, refetch } = useGetAllProduceQuery()
    const [deleteProduce] = useDeleteProduceMutation()
    const [createProduce] = useCreateProduceMutation()
    const dispatch = useDispatch()

    const handleDelete = async (item_id) => {
        try {
            await deleteProduce(item_id)
            refetch()
        } catch (error) {}
        console.log('Deleting item with ID:', item_id)
    };

    const handleSubmit = async (produceData) => {
        try {
            await createProduce(produceData);
            refetch();
        } catch (error) {
            console.error('Error adding produce:', error);
        }
    };

    if (isLoading) return <>Loading...</>

    return (
        <div className="overflow-x-auto">
            <h1>Produce</h1>
            <AddProduceForm onSubmit={handleSubmit} />
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Exp Date</th>
                        <th>Measurement</th>
                        <th>Store</th>
                    </tr>
                </thead>
                {/* {data.map((p) => ( */}
                <tbody>
                    {data.map((p) => (
                        <tr key={p.id} id={p.id}>
                            <td>{p.name}</td>
                            <td>{p.cost}</td>
                            <td>{p.expiration_date}</td>
                            <td>{p.measurement}</td>
                            <td>{p.store_name}</td>
                            <td>
                                <button className="btn btn-info">
                                    <Link to={`/produce/${p.id}`}>
                                        Details
                                    </Link>
                                </button>
                                <button
                                    className="btn btn-error"
                                    onClick={() => handleDelete(p.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {/* ))} */}
            </table>
        </div>
    )
}
function AddProduceForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [measurement, setMeasurement] = useState('');
    const [storeName, setStoreName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, cost, expirationDate, measurement, storeName });
        // Reset form fields after submission
        setName('');
        setCost('');
        setExpirationDate('');
        setMeasurement('');
        setStoreName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} required />
            <input type="date" placeholder="Expiration Date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} required />
            <input type="text" placeholder="Measurement" value={measurement} onChange={(e) => setMeasurement(e.target.value)} required />
            <input type="text" placeholder="Store Name" value={storeName} onChange={(e) => setStoreName(e.target.value)} required />
            <button type="submit">Add Produce</button>
        </form>
    );
}
export default ProduceList
