import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categoryOptions = [
    {
        value: 'raw-food',
        label: 'Raw Food',
        image: 'img/raw-food.png',
    },
    {
        value: 'cooked-food',
        label: 'Cooked Food',
        image: 'img/cooked-food.png',
    },
    {
        value: 'packed-food',
        label: 'Packed Food',
        image: 'img/packed-food.png',
    },
];

const FoodDonationForm = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            email: userEmail || "",
        }));
    }, [userEmail]);

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

    const handleCategorySelect = (category) => {
        setFormData((prevData) => ({
            ...prevData,
            category,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

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
        } finally {
            setIsSubmitting(false);
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
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {categoryOptions.map((option) => {
                                    const isSelected = formData.category === option.value;

                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => handleCategorySelect(option.value)}
                                            className={`rounded-[24px] border-2 p-2 text-left transition-all ${
                                                isSelected
                                                    ? 'border-[var(--theme-accent-deep)] bg-[rgba(221,235,229,0.72)] shadow-[0_14px_32px_rgba(45,93,91,0.22)]'
                                                    : 'border-transparent bg-[var(--theme-card)] shadow-md hover:-translate-y-0.5 hover:border-[rgba(79,127,125,0.2)]'
                                            }`}
                                            aria-pressed={isSelected}
                                        >
                                            <img
                                                src={option.image}
                                                alt={option.label}
                                                className="h-36 w-full rounded-[18px] object-cover"
                                            />
                                            <p className={`px-2 pb-1 pt-3 text-center text-sm font-semibold uppercase tracking-[0.16em] ${
                                                isSelected
                                                    ? 'text-[var(--theme-accent-deep)]'
                                                    : 'text-[var(--theme-ink)]'
                                            }`}>
                                                {option.label}
                                            </p>
                                        </button>
                                    );
                                })}
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
                                disabled={isSubmitting}
                                aria-busy={isSubmitting}
                                className="theme-button w-3/5 rounded-[18px] p-3 text-lg disabled:cursor-not-allowed disabled:opacity-75"
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FoodDonationForm;

