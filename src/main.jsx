import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import { queryClient } from './lib/queryClient'
import Layout from './routes/Layout'
import Home from './routes/Home'
import CulturePage from './routes/CulturePage'
import './styles/index.css'
const root = createRootRoute({ component: Layout })
const index = createRoute({ getParentRoute: () => root, path: '/', component: Home })
const culture = createRoute({ getParentRoute: () => root, path: '/culture/$slug', component: CulturePage })
const router = createRouter({ routeTree: root.addChildren([index, culture]), defaultPreload: 'intent', scrollRestoration: true })
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}><RouterProvider router={router} /></QueryClientProvider>)
