

import React, { useState } from 'react';
const AddVehicle = () => {



    const [form, setForm] = useState({ name: '', capacity: '', tyres: '' });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);


    const tyreOptions = [2, 3, 4, 6, 8, 10, 12, 16];


    function validate(values) {
        const errs = {};
        if (!values.name.trim()) errs.name = 'Name is required';
        if (values.capacity === '' || Number.isNaN(Number(values.capacity))) errs.capacity = 'Capacity is required';
        else if (Number(values.capacity) <= 0) errs.capacity = 'Capacity must be greater than 0';
        if (!values.tyres) errs.tyres = 'Please select tyres count';
        return errs;
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const v = validate(form);
        setErrors(v);
        if (Object.keys(v).length === 0) {
            setSubmitted(true);
            // call optional callback with normalized data
            const payload = { ...form, capacity: Number(form.capacity), tyres: Number(form.tyres) };
            if (onSubmit) onSubmit(payload);
            // default behavior: log to console
            console.log('Vehicle submitted', payload);
            // clear the form after a short delay so the user sees success
            setTimeout(() => {
                setForm({ name: '', capacity: '', tyres: '' });
                setSubmitted(false);
            }, 1200);
        }
    };
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add Vehicle</h2>
            <form onSubmit={handleSubmit} noValidate>
                <label className="block mb-4">
                    <span className="text-sm font-medium">Name</span>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1 ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                        placeholder="e.g. Ford Transit"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        required
                    />
                    {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </label>


                <label className="block mb-4">
                    <span className="text-sm font-medium">Capacity (KG)</span>
                    <div className="mt-1 relative">
                        <input
                            name="capacity"
                            value={form.capacity}
                            onChange={handleChange}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className={`block w-full rounded-lg border px-3 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-offset-1 ${errors.capacity ? 'border-red-400' : 'border-gray-200'}`}
                            placeholder="e.g. 1500"
                            aria-invalid={!!errors.capacity}
                            aria-describedby={errors.capacity ? 'capacity-error' : undefined}
                            required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">KG</span>
                    </div>
                    {errors.capacity && <p id="capacity-error" className="text-red-500 text-sm mt-1">{errors.capacity}</p>}
                </label>


                <label className="block mb-6">
                    <span className="text-sm font-medium">Tyres</span>
                    <select
                        name="tyres"
                        value={form.tyres}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1 ${errors.tyres ? 'border-red-400' : 'border-gray-200'}`}
                        required
                        aria-invalid={!!errors.tyres}
                        aria-describedby={errors.tyres ? 'tyres-error' : undefined}
                    >
                        <option value="">Select tyres</option>
                        {tyreOptions.map((t) => (
                            <option key={t} value={t}>{t} tyres</option>
                        ))}
                    </select>
                    {errors.tyres && <p id="tyres-error" className="text-red-500 text-sm mt-1">{errors.tyres}</p>}
                </label>


                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1"
                    >
                        {submitted ? 'Saved ✓' : 'Save Vehicle'}
                    </button>


                    <button
                        type="button"
                        onClick={() => setForm({ name: '', capacity: '', tyres: '' })}
                        className="text-sm text-gray-600 hover:underline"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddVehicle