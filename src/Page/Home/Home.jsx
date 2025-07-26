
import { useEffect } from 'react';
import Posts from '../../components/Posts'
import ShowAnnouncements from '../../components/ShowAnnouncements';

const Home = () => {
    
    useEffect(() => {
        document.title = 'Home | ChatOrbit';
    }, []);

    return (
        <div>
            <Posts></Posts>
            <ShowAnnouncements></ShowAnnouncements>
        </div>
    );
};

export default Home;