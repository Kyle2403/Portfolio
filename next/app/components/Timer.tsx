
const Timer = ({ time }: CountdownProps) => {

  return (
    <span>
        <span className="countdown font-mono text-6xl">
          <span style={{ ["--value" as any]: Math.floor(time / 60) % 60 }}></span>:
        </span>

        <span className="countdown font-mono text-6xl">
          <span style={{ ["--value" as any]: time % 60 }}></span>
        </span>

    </span>
        
    
  );
};

export default Timer;
