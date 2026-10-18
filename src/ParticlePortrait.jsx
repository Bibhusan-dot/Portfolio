
import { useEffect, useRef } from "react";
import "./ParticlePortrait.css";

export default function ParticlePortrait({ src }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const photo = new Image();
        let animationId;
        let particles = [];
        let time = 0;
        let width, height;

        photo.onload = () => {
            resize();
        };

        photo.src = src;

        function resize() {
            width = canvas.clientWidth;
            height = canvas.clientHeight;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (!photo.complete || !photo.naturalWidth) return;

            const buffer = document.createElement("canvas");
            const bctx = buffer.getContext("2d");

            const scale = Math.min(
                width / photo.naturalWidth,
                height / photo.naturalHeight
            );

            const w = photo.naturalWidth * scale;
            const h = photo.naturalHeight * scale;
            const ox = (width - w) / 2;
            const oy = (height - h) / 2;

            buffer.width = Math.max(1, Math.floor(w));
            buffer.height = Math.max(1, Math.floor(h));

            bctx.drawImage(photo, 0, 0, buffer.width, buffer.height);

            const pixels = bctx.getImageData(
                0, 0, buffer.width, buffer.height
            ).data;

            particles = [];
            const spacing = 5;

            for (let y = 0; y < buffer.height; y += spacing) {
                for (let x = 0; x < buffer.width; x += spacing) {
                    const i = (y * buffer.width + x) * 4;
                    const brightness =
                        (pixels[i] * 0.299 +
                            pixels[i + 1] * 0.587 +
                            pixels[i + 2] * 0.114) / 255;

                    // Fewer particles in bright areas.
                    if (Math.random() > 0.25 + brightness * 0.65) {
                        particles.push({
                            x: ox + x,
                            y: oy + y,
                            size: Math.random() > 0.9 ? 1.6 : 0.8,
                            phase: Math.random() * Math.PI * 2,
                            plus: Math.random() > 0.92,
                        });
                    }
                }
            }
        }

        function draw() {
            ctx.fillStyle = "#08172a";
            ctx.fillRect(0, 0, width, height);

            for (const p of particles) {
                const wave =
                    Math.sin(p.y * 0.025 + time + p.phase) * 2.5 +
                    Math.cos(p.x * 0.018 + time) * 1.5;

                const x = p.x + wave;
                const y = p.y + Math.sin(time + p.phase) * 1.5;

                ctx.strokeStyle = "#36e8d1";
                ctx.fillStyle = "#36e8d1";
                ctx.globalAlpha = 0.8;

                if (p.plus) {
                    ctx.beginPath();
                    ctx.moveTo(x - 1.7, y);
                    ctx.lineTo(x + 1.7, y);
                    ctx.moveTo(x, y - 1.7);
                    ctx.lineTo(x, y + 1.7);
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.arc(x, y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            ctx.globalAlpha = 1;
            time += 0.012;
            animationId = requestAnimationFrame(draw);
        }

        window.addEventListener("resize", resize);
        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, [src]);

    return <canvas ref={canvasRef} className="particle-portrait" />;
}
