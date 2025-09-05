
const Counter = ({count}: {count: number}) => {

  return (
        <span className="countdown font-mono text-6xl">
          <span
            style={{ "--value": count } as React.CSSProperties}
            aria-live="polite"
            aria-label={count.toString()}
          >
            {count}
          </span>
        </span>
    
  );
};

export default Counter;
