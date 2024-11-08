import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

function StatusPage() {
    const navigate = useNavigate();
    const [farms, setFarms] = useState([]);
    const [farmName, setFarmName] = useState('');
    const [farmAddress, setFarmAddress] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    // Gọi API để lấy danh sách trang trại
    useEffect(() => {
        const fetchFarms = async () => {
            setLoading(true); // Start loading
            const url = 'http://shrimppond.runasp.net/api/Farm?pageSize=200&pageNumber=1';
            try {
                const response = await axios.get(url);
                const farmData = response.data.map((farm, index) => ({
                    id: index + 1, // Hoặc bạn có thể sử dụng farm.id nếu có
                    name: farm.farmName,
                    address: farm.address
                }));
                setFarms(farmData);
            } catch (error) {
                console.error('Failed to fetch farms:', error);
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchFarms();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!farmName || !farmAddress) {
            alert('Vui lòng nhập cả tên và địa chỉ trang trại.');
            return;
        }

        addFarm();
    };

    const addFarm = async () => {
        const newFarm = { farmName, address: farmAddress };
        
        try {
            const response = await axios.post('http://shrimppond.runasp.net/api/Farm', newFarm);
            setFarms([...farms, { id: farms.length + 1, ...response.data }]);
            setFarmName('');
            setFarmAddress('');
        } catch (error) {
            console.error('Failed to add farm:', error);
            alert('Không thể thêm trang trại. Vui lòng thử lại.');
        }
    };

    const deleteFarm = async (farmName) => {
        try {
            await axios.delete(`http://shrimppond.runasp.net/api/Farm?FarmName=${encodeURIComponent(farmName)}`);
            // Cập nhật danh sách farms sau khi xóa thành công
            setFarms(farms.filter(farm => farm.name !== farmName));
        } catch (error) {
            console.error('Failed to delete farm:', error);
            alert('Không thể xóa trang trại. Vui lòng thử lại.');
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-grow flex flex-col items-center justify-start p-10">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl space-y-6">
                    <h1 className="text-lg font-bold mb-4">Thông tin trang trại</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Trang trại
                        </label>
                        <input
                            type="text"
                            value={farmName}
                            onChange={(e) => setFarmName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Tên trang trại"
                            required
                        />
                        <label className="block text-sm font-medium text-gray-700">
                            Địa chỉ
                        </label>
                        <input
                            type="text"
                            value={farmAddress}
                            onChange={(e) => setFarmAddress(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Địa chỉ trang trại"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Thêm trang trại
                        </button>
                    </form>

                    {/* Loading message */}
                    {loading ? (
                        <div className="text-center text-gray-500">Loading data...</div>
                    ) : (
                        <div>
                            <h2 className="text-lg font-semibold">Danh sách trang trại</h2>
                            <div className="max-h-56 overflow-y-auto divide-y divide-gray-200">
                                {farms.map(farm => (
                                    <div key={farm.id} className="flex justify-between items-center p-2">
                                        <span>{farm.name} - {farm.address}</span>
                                        <button
                                            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                                            onClick={() => deleteFarm(farm.name)}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default StatusPage;
