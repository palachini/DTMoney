import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer( {
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Salário Aulas',
          type: 'deposit',
          category: 'CLT',
          amount: 1100,
          createdAt: new Date('2022-07-07 00:00:00'),
        },
        {
          id: 2,
          title: 'Internet',
          type: 'withdraw',
          category: 'Casa',
          amount: 99,
          createdAt: new Date('2022-07-10 00:00:00'),
        }
      ],
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', (schema)=>{
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data);
    })
  }
})
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


