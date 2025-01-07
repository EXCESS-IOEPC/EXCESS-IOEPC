import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export default function Timer() {
	const [over, setOver] = useState(false);
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const target = new Date('2025-01-24T10:00:00');
		const interval = setInterval(() => {
			const now = new Date();
			const difference = target.getTime() - now.getTime();

			const d = Math.floor(difference / (1000 * 60 * 60 * 24));
			setDays(d);
			const h = Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			setHours(h);
			const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			setMinutes(m);
			const s = Math.floor((difference % (1000 * 60)) / 1000);
			setSeconds(s);

			if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
				setOver(true);
				clearInterval(interval);

				// Trigger the confetti blast when the timer ends
				confetti({
					particleCount: 200,
					spread: 70,
					origin: { y: 0.6 },
				});
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			{over ? (
				<div className="flex flex-col items-center text-center text-white  rounded-lg shadow-xl">
					<h1 className="text-3xl font-extrabold animate-bounce">
						🎉 Hackathon is Ongoing!
					</h1>
				</div>
			) : (
				<div className="flex items-center text-white rounded-lg px-8 flex-col">
					<div className="flex flex-col sm:flex-row text-center">
						<div className="flex flex-col px-8 py-4">
							<span className="time text-6xl font-bold ">{days}</span>
							<span className="label uppercase tracking-widest">Days</span>
						</div>
						<div className="flex flex-col px-8 py-4">
							<span className="time text-6xl font-bold">{hours}</span>
							<span className="label uppercase tracking-widest">Hours</span>
						</div>
						<div className="flex flex-col px-8 py-4">
							<span className="time text-6xl font-bold">{minutes}</span>
							<span className="label uppercase tracking-widest">Minutes</span>
						</div>
						<div className="flex flex-col px-8 py-4">
							<span className="time text-6xl font-bold">{seconds}</span>
							<span className="label uppercase tracking-widest">Seconds</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
