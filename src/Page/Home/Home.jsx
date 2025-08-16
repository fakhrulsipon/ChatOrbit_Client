
import { useEffect } from 'react';
import Posts from '../../components/Posts'
import ShowAnnouncements from '../../components/ShowAnnouncements';
import LatestPosts from '../../components/LatestPosts';
import TopVotedPosts from '../../components/TopVotedPosts';
import FAQSection from '../Comments/FAQSection';
import Testimonials from '../../components/Testimonials';
import Features from '../../components/Features';
import Join from '../../components/Join';

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
            <Features></Features>
            <Testimonials></Testimonials>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;