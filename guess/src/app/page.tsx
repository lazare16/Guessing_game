'use client';

import { useState } from 'react';
import { FormEvent } from 'react';

export default function Home() {
    const [guess, setGuess] = useState(''); // Initialize as an empty string
    const [response, setResponse] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!guess) {
            setResponse('Please enter a valid number.');
            return;
        }

        try {
            const res = await fetch('http://127.0.0.1:8080/guess', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ guess: parseInt(guess) }), // Wrap in object
            });

            const text = await res.text();
            setResponse(text);
        } catch (error) {
            setResponse('Error communicating with the server.');
        }
    };

    return (
        <div>
            <h1>Guess the Number</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)} // Update state as string
                    placeholder="Enter your guess"
                />
                <button type="submit">Submit</button>
            </form>
            {response && <p>Response: {response}</p>}
        </div>
    );
}
