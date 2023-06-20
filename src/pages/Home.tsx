import Welcome from "../components/Welcome.tsx";
import Album from "../components/Album.tsx";
import Card from "../components/Card.tsx";

const Home = () => {
    const cardData = [
        {
            id: 1,
            content: 'Card 1 content',
        },
        {
            id: 2,
            content: 'Card 2 content',
        },
        {
            id: 3,
            content: 'Card 3 content',
        },
    ];

    return (
        <>
            <Welcome />
            <Album />
            <div className="row">
                {cardData.map((card) => (
                    <div className="col-md-4" key={card.id}>
                        <Card cardData={card} />
                    </div>
                ))}
            </div>

        </>
    );
};

export default Home;