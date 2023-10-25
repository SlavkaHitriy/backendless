import { Navigate, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Tabs } from "./components/Tabs.jsx"

const DummyTableLazy = lazy(() => import('./pages/dummyTable.jsx'))
const DummyChartLazy = lazy(() => import('./pages/dummyChart.jsx'))
const DummyListLazy = lazy(() => import('./pages/dummyList.jsx'))

export const App = () => {
    return (
        <>
            <Tabs />
            <div style={{
                padding: '24px'
            }}>
                <Suspense fallback={'Loading...'}>
                    <Routes>
                        <Route path={'/dummyTable'} element={<DummyTableLazy />}/>
                        <Route path={'/dummyChart'} element={<DummyChartLazy />}/>
                        <Route path={'/dummyList'} element={<DummyListLazy />}/>
                        <Route path={'*'} element={<Navigate to={'/dummyTable'} />}/>
                    </Routes>
                </Suspense>
            </div>
        </>
    );
};

