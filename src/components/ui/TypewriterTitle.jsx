import React from 'react';

// Efeito de digitação linha a linha (extraído da Hero da Brand) — a última linha
// recebe o destaque com contorno vazado (headline-stroke).
const TypewriterTitle = ({ lines, typedCount }) => {
    const totalChars = lines.reduce((sum, line) => sum + line.length, 0);

    return (
        <>
            {lines.map((line, index) => {
                const isLast = index === lines.length - 1;
                const previousChars = lines.slice(0, index).reduce((sum, item) => sum + item.length, 0);
                const remaining = typedCount - previousChars;
                const charsVisible = Math.max(0, Math.min(line.length, remaining));
                const typed = line.slice(0, charsVisible);
                const untyped = line.slice(charsVisible);
                const showCursor = remaining >= 0 && remaining < line.length;

                const cursor = (showCursor || (typedCount >= totalChars && isLast))
                    ? <span className="hero-type-cursor" aria-hidden="true" />
                    : null;

                return (
                    <React.Fragment key={`${line}-${index}`}>
                        {isLast ? (
                            <em className="headline-stroke">
                                {typed}{cursor}<span style={{ opacity: 0 }}>{untyped}</span>
                            </em>
                        ) : (
                            <>{typed}{cursor}<span style={{ opacity: 0 }}>{untyped}</span></>
                        )}
                        {!isLast && <br />}
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default TypewriterTitle;
