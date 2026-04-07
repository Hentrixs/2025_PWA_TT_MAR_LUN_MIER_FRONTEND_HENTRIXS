const Logo = ({ width = 120, height = 120 }: { width?: number; height?: number }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="30" fill="url(#paint0_linear)" />
            <path d="M28 42C28 35.3726 33.3726 30 40 30H60C66.6274 30 72 35.3726 72 42V52C72 58.6274 66.6274 64 60 64H51.5L41 74V64H40C33.3726 64 28 58.6274 28 52V42Z" fill="white" />
            <path d="M42 47H58M42 53H52" stroke="#052E16" strokeWidth="4" strokeLinecap="round" />
            <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#22C55E" />
                    <stop offset="1" stopColor="#052E16" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default Logo;
