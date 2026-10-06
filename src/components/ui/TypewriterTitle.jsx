import React from 'react';

// O texto completo permanece estável no DOM; só a máscara visual é animada.
// Isso preserva a digitação sem disputar os nós de texto com tradutores automáticos.
const TypewriterTitle = ({ lines }) => {
    let elapsed = 0;

    return (
        <>
            {lines.map((line, index) => {
                const duration = Math.max(0.8, line.length * 0.045);
                const style = {
                    '--type-chars': line.length,
                    '--type-duration': `${duration}s`,
                    '--type-delay': `${elapsed}s`,
                };
                elapsed += duration;
                const content = (
                    <>
                        <span className="hero-type-content">{line}</span>
                        <span className="hero-type-cursor" aria-hidden="true" />
                    </>
                );

                return (
                    <React.Fragment key={`${line}-${index}`}>
                        {index === lines.length - 1
                            ? <em className="hero-type-line headline-stroke" style={style}>{content}</em>
                            : <span className="hero-type-line" style={style}>{content}</span>}
                        {index < lines.length - 1 && <br />}
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default TypewriterTitle;
