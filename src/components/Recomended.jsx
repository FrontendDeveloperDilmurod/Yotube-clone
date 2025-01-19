import React, { useEffect, useState } from 'react';
import { API_KEY, value_converter } from '../data';
import { Link } from 'react-router-dom';

const Recomended = ({ categoryId }) => {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true); // Yuklash holati
    const [error, setError] = useState(null); // Xatoliklarni ushlash uchun state

    const fetchData = async () => {
        const apiData_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&maxResults=10&key=${API_KEY}`;
        try {
            const response = await fetch(apiData_url);
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                setApiData(data.items); // Faqat mavjud ma'lumotlarni o'rnatadi
            } else {
                setApiData([]); // Ma'lumot bo'lmasa, bo'sh array o'rnatiladi
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Yuklash tugagach, loading holatini yangilash
        }
    };

    useEffect(() => {
        fetchData();
    }, [categoryId]);

    if (loading) {
        return <p className="text-blue-500">Ma'lumotlar yuklanmoqda...</p>;
    }

    if (error) {
        return <p className="text-red-500">Xatolik yuz berdi: {error}</p>;
    }

    if (!apiData.length) {
        return <p className="text-gray-500">Hech qanday ma'lumot topilmadi.</p>;
    }

    return (
        <div>
            {apiData.map((item) => {
                const { snippet, statistics } = item;
                const { thumbnails, title, channelTitle } = snippet;
                const viewCount = statistics?.viewCount || 'N/A';
                return (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={item.id}>
                        <div
                            className="flex flex-row items-center gap-4 p-4 transition-all cursor-pointer hover:bg-gray-100 rounded-xl"
                        >
                            <img
                                src={thumbnails?.medium?.url || ''}
                                alt={title}
                                className="w-[160px] h-[90px] object-cover rounded-xl shadow-md"
                            />
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
                                <p className="text-xs text-gray-500">{channelTitle}</p>
                                <p className="text-xs text-gray-400">{value_converter(viewCount)} views</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default Recomended;
