import React from 'react';
import PlayVideo from '../../components/PlayVideo';
import { useParams } from 'react-router-dom';

const Video = () => {
    const { videoId, categoryId } = useParams(); // Correctly destructuring useParams
    return (
        <div>
            <PlayVideo videoId={videoId} categoryId={categoryId} />
        </div>
    );
};

export default Video;
