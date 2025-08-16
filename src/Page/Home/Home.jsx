
import { useEffect } from 'react';
import Posts from '../../components/Posts'
import ShowAnnouncements from '../../components/ShowAnnouncements';
import LatestPosts from '../../components/LatestPosts';
import TopVotedPosts from '../../components/TopVotedPosts';

const Home = () => {
    
    useEffect(() => {
        document.title = 'Home | ChatOrbit';
    }, []);

    return (
        <div>
            <Posts></Posts>
             <LatestPosts></LatestPosts>
            <TopVotedPosts></TopVotedPosts>
            <ShowAnnouncements></ShowAnnouncements>
        </div>
    );
};

export default Home;