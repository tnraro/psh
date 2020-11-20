import Link from "next/link";

interface IProp {}

const App = (props: IProp) => {
    return (
        <div>
            <p>unimplement page</p>
            <Link href="/">back to root</Link>
        </div>
    );
};

export default App;
