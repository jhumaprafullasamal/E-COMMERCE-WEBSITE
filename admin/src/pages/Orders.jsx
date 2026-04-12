import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const currency = "$"
  const [orders, setOrders] = useState([])

  const fetchAllorders = async () => {

    if (!token) return

    try {

      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {

    try {

      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: event.target.value
        },
        { headers: { token } }
      )

      if (response.data.success) {
        fetchAllorders()
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllorders()
  }, [token])

  return (

    <div className='p-4'>

      <h3 className='text-lg font-semibold mb-4'>Order Page</h3>

      <div className='space-y-6'>

        {orders.map((order, index) => (

          <div
            key={index}
            className='grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr] gap-4 items-start border p-4 rounded'
          >

            {/* ICON */}
            <img
              className='w-12'
              src={assets.parcel_icon}
              alt=""
            />

            {/* ORDER INFO */}
            <div>

              <div>
                {order.items.map((item, i) => (
                  <p key={i}>
                    {item.name} x {item.quantity}
                    <span className='text-gray-500'> {item.size}</span>
                  </p>
                ))}
              </div>

              <p className='mt-3 font-medium'>
                {order.address.firstName + " " + order.address.lastName}
              </p>

              <div className='text-sm text-gray-500'>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>

              <p className='text-sm'>{order.address.phone}</p>

            </div>

            {/* ORDER DETAILS */}
            <div className='text-sm'>

              <p>Items : {order.items.length}</p>

              <p>Method : {order.paymentMethod}</p>

              <p>
                Payment :
                <span className={order.payment ? "text-green-600" : "text-red-500"}>
                  {order.payment ? " Done" : " Pending"}
                </span>
              </p>

              <p>
                Date : {new Date(order.date).toLocaleDateString()}
              </p>

            </div>

            {/* PRICE + STATUS */}
            <div className='flex flex-col gap-3'>

              <p className='font-semibold'>
                {currency}{order.amount}
              </p>

              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className='border p-2 rounded'
              >

                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>

              </select>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}

export default Orders 