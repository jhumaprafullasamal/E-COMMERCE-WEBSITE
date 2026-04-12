import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {

    try {

      e.preventDefault()

      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      )

      if (response.data.success) {

        toast.success(response.data.message)
        setName("")
        setDescription("")
        setPrice("")
        setSizes([])
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      }
      else {
        toast.error(response.data.message)
      }

    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  return (

    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">

      {/* IMAGE UPLOAD */}

      <div>

        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">

          <label htmlFor="image1">
            <img className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>

          <label htmlFor="image2">
            <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>

          <label htmlFor="image3">
            <img className="w-20" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>

          <label htmlFor="image4">
            <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>

        </div>

      </div>

      {/* PRODUCT NAME */}

      <div className="w-full">

        <p className="mb-2">Product name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Type here"
          value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      {/* DESCRIPTION */}
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write content here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      {/* CATEGORY */}

      <div className="flex gap-3">
        <div>
          <p className="mb-2">Product Category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="px-3 py-2">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Price</p>
          <input
            type="number"
            className="px-3 py-2 w-24"
            placeholder="25"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      {/* SIZES */}
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((item) => (
            <p
              key={item}
              onClick={() => setSizes(prev => prev.includes(item) ?
                prev.filter(i => i !== item) : [...prev, item])}
              className={`px-3 py-1 cursor-pointer ${sizes.includes(item) ?
                "bg-pink-100" : "bg-slate-200"}`}>
              {item}
            </p>
          ))}
        </div>
      </div>

      {/* BESTSELLER */}
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller(prev => !prev)} />
        <p>Add to bestseller</p>
      </div>
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>

  )

}

export default Add