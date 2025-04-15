import React, { useState } from "react";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://127.0.0.1:8000/api/newsletter/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setEmail("");
            } else {
                setMessage(data.message || "Something went wrong.");
            }
        } catch (err) {
            setMessage("Could not connect to the server.");
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                    <h2 className="mb-3">Subscribe to Our Newsletter</h2>
                    <p className="mb-4 text-muted">Stay updated with our latest news!</p>
                    <form onSubmit={handleSubmit} className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2">
                        <input
                            type="email"
                            className="form-control p-3"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ maxWidth: "400px" }}
                        />
                        <button type="submit" className="btn btn-primary px-4 py-2">
                            Subscribe
                        </button>
                    </form>
                    {message && <p className="mt-3 text-info">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
