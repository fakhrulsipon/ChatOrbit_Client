
import { useEffect } from 'react';
import Posts from '../../components/Posts'
import ShowAnnouncements from '../../components/ShowAnnouncements';
import LatestPosts from '../../components/LatestPosts';
import TopVotedPosts from '../../components/TopVotedPosts';
import HeroSection from '../../components/HeroSection';
import FAQSection from '../Comments/FAQSection';

const Home = () => {
    
    useEffect(() => {
        document.title = 'Home | ChatOrbit';
    }, []);

    return (
        <div>
            <HeroSection></HeroSection>
            
            <Posts></Posts>
             <LatestPosts></LatestPosts>
            <TopVotedPosts></TopVotedPosts>
            <ShowAnnouncements></ShowAnnouncements>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;