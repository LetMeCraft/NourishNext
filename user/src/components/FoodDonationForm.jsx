import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FoodDonationForm = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));

    // Listen to changes in the localStorage for the userEmail
    useEffect(() => {
        const handleStorageChange = () => {
            setUserEmail(localStorage.getItem("email"));
        };

        // Event listener to track localStorage changes
        window.addEventListener('storage', handleStorageChange);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
    useEffect(() => {
        if (!userEmail) {
            toast.error("You must be logged in to donate food.");
            navigate("/signup"); // Redirect to signup page if not logged in
        }
    }, [userEmail, navigate]);

    const [formData, setFormData] = useState({
        foodname: '',
        meal: 'veg',
        category: 'cooked-food',
        quantity: '',
        phoneno: '',
        district: 'chennai',
        address: '',
        name: '',
        email: userEmail || "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/food-donation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Donation submitted successfully!");
                setFormData({
                    foodname: '',
                    meal: 'veg',
                    category: 'cooked-food',
                    quantity: '',
                    phoneno: '',
                    district: 'madurai',
                    address: '',
                    name: '',
                    email: userEmail,
                });
                setTimeout(() => {
                    navigate("/"); // 👈 Redirect to home page after 5 seconds
                }, 2000); // 5000ms = 5 seconds // 👈 Redirect to home page
            }
            else {
                toast.error(data.message || "Submission failed.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Submission failed.");
        }
    };


    return (
        <div>
            <ToastContainer />
            <div className="theme-page flex min-h-screen items-center justify-center py-8">
                <div className="theme-card-soft mt-10 w-full max-w-2xl rounded-[32px] p-8">
                    <h1 className="mb-6 text-center text-3xl font-bold text-[var(--theme-ink)]">
                        Nourish <span className="text-[var(--theme-accent-deep)]">Next</span>
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="mb-2 block text-lg font-medium text-[var(--theme-ink)]" htmlFor="foodname">
                                Food Name:
                            </label>
                            <input
                                type="text"
                                id="foodname"
                                name="foodname"
                                className="theme-input"
                                value={formData.foodname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-lg font-medium text-[var(--theme-ink)]">Meal type:</label>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="veg"
                                    name="meal"
                                    value="veg"
                                    checked={formData.meal === 'veg'}
                                    onChange={handleChange}
                                    className="mr-2 accent-[var(--theme-accent-deep)]"
                                />
                                <label htmlFor="veg" className="mr-6 text-[var(--theme-ink)]">Veg</label>

                                <input
                                    type="radio"
                                    id="Non-veg"
                                    name="meal"
                                    value="Non-veg"
                                    checked={formData.meal === 'Non-veg'}
                                    onChange={handleChange}
                                    className="mr-2 accent-[var(--theme-accent-deep)]"
                                />
                                <label htmlFor="Non-veg" className="text-[var(--theme-ink)]">Non-veg</label>
                            </div>
                        </div>

                        <div className="mb-9 mt-9">
                            <label className="mb-2 block text-lg font-medium text-[var(--theme-ink)]">Select the Category:</label>
                            <div className="flex flex-wrap justify-around gap-4">
                                <label htmlFor="raw-food">
                                    <input
                                        type="radio"
                                        id="raw-food"
                                        name="category"
                                        value="raw-food"
                                        checked={formData.category === 'raw-food'}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <img
                                        src="img/raw-food.png"
                                        alt="raw-food"
                                        className={`w-40 cursor-pointer rounded-[22px] border-2 border-transparent bg-[var(--theme-card)] p-1 shadow-md transition hover:scale-105 ${formData.category === 'raw-food' ? 'border-[var(--theme-accent-deep)] shadow-[0_14px_32px_rgba(45,93,91,0.22)]' : ''}`}
                                    />
                                </label>

                                <label htmlFor="cooked-food">
                                    <input
                                        type="radio"
                                        id="cooked-food"
                                        name="category"
                                        value="cooked-food"
                                        checked={formData.category === 'cooked-food'}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <img
                                        src="img/cooked-food.png"
                                        alt="cooked-food"
                                        className={`w-40 cursor-pointer rounded-[22px] border-2 border-transparent bg-[var(--theme-card)] p-1 shadow-md transition hover:scale-105 ${formData.category === 'cooked-food' ? 'border-[var(--theme-accent-deep)] shadow-[0_14px_32px_rgba(45,93,91,0.22)]' : ''}`}
                                    />
                                </label>

                                <label htmlFor="packed-food">
                                    <input
                                        type="radio"
                                        id="packed-food"
                                        name="category"
                                        value="packed-food"
                                        checked={formData.category === 'packed-food'}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <img
                                        src="img/packed-food.png"
                                        alt="packed-food"
                                        className={`w-40 cursor-pointer rounded-[22px] border-2 border-transparent bg-[var(--theme-card)] p-1 shadow-md transition hover:scale-105 ${formData.category === 'packed-food' ? 'border-[var(--theme-accent-deep)] shadow-[0_14px_32px_rgba(45,93,91,0.22)]' : ''}`}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="mb-12">
                            <label className="mb-2 block text-lg font-medium text-[var(--theme-ink)]" htmlFor="quantity">
                                Quantity (number of persons / kg):
                            </label>
                            <input
                                type="text"
                                id="quantity"
                                name="quantity"
                                maxLength="5"
                                pattern="^[0-9]{1,5}$"
                                className="theme-input"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <p className="mb-3 text-center text-2xl font-semibold text-[var(--theme-accent-deep)]">Contact Details</p>

                        <div className="mb-4">
                            <label className="mb-2 block text-lg font-medium text-[var(--theme-ink)]" htmlFor="name">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="theme-input"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-lg font-medium text-[var(--theme-ink)]" htmlFor="phoneno">
                                Phone No:
                            </label>
                            <input
                                type="text"
                                id="phoneno"
                                name="phoneno"
                                className="theme-input"
                                maxLength="10"
                                pattern="[0-9]{10}"
                                value={formData.phoneno}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-lg font-medium text-[var(--theme-ink)]" htmlFor="district">
                                District:
                            </label>
                            <select
                                id="district"
                                name="district"
                                className="theme-input"
                                value={formData.district}
                                onChange={handleChange}
                            >
                                <option value="madurai">Madurai</option>
                                <option value="chennai">Chennai</option>
                                <option value="coimbatore">Coimbatore</option>
                                {/* Add other districts here */}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-lg font-medium text-[var(--theme-ink)]" htmlFor="address">
                                Address:
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="theme-input"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4 mt-10 flex justify-center">
                            <button
                                type="submit"
                                className="theme-button w-3/5 rounded-[18px] p-3 text-lg"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FoodDonationForm;

