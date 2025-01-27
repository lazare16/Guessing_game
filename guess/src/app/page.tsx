'use client';

import { useState } from 'react';
import { FormEvent } from 'react';

export default function Home() {
    const [guess, setGuess] = useState(''); // Client-only state
    const [response, setResponse] = useState(''); // Client-only state

    console.log('Server URL:', process.env.NEXT_PUBLIC_SERVER_URL);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!guess) {
            setResponse('Please enter a valid number.');
            return;
        }

        try {
            // Replace with your ngrok URL
            const res = await fetch('https://1909-178-134-133-38.ngrok-free.app/guess', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ guess: parseInt(guess, 10) }),
            });
            



            const text = await res.text();
            setResponse(text);
        } catch (error) {
            setResponse(`Error communicating with the server: ${error}`);
        }
    };

    return (
        <div>
            <h1>Guess the Number</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)} // Ensure controlled input
                    placeholder="Enter your guess"
                />
                <button type="submit">Submit</button>
            </form>
            {response && <p>Response: {response}</p>}
        </div>
    );
}
