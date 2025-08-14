'use client';

import React from 'react';

export default function ProductManagerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            产品管理
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">
                门窗产品
              </h2>
              <p className="text-blue-700">
                管理各类门窗产品信息、规格和价格
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h2 className="text-xl font-semibold text-green-900 mb-3">
                库存管理
              </h2>
              <p className="text-green-700">
                实时监控产品库存状态和补货提醒
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h2 className="text-xl font-semibold text-purple-900 mb-3">
                订单处理
              </h2>
              <p className="text-purple-700">
                处理客户订单和生产安排
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              快速操作
            </h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                添加新产品
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                库存盘点
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                生成报表
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}