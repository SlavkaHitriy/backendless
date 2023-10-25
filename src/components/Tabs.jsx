import { lazy, Suspense, useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"

export const Tabs = () => {
    const {pathname} = useLocation()
    const [tabsData, setTabsData] = useState([])
    const [importedComponent, setImportedComponent] = useState()

    const loadTabsData = async () => {
        try {
            const response = await fetch('/data/tabs.json')
            const data = await response.json()

            setTabsData(data)
        } catch (e) {
            console.log(e)
        }
    }

    const loadComponent = async () => {
        const filePath = tabsData.find((tab) => pathname.includes(tab.id))?.path

        if (filePath) {
            const Component = await lazy(() => import(`/src/${filePath}x`))
            setImportedComponent(<Component />)
        }
    }

    useEffect(() => {
        loadTabsData()
    }, [])

    useEffect(() => {
        if (pathname && tabsData.length > 0) {
            loadComponent()
        }
    }, [tabsData, pathname])

    return (<>
        <div style={{
            display: 'flex',
            gap: '24px',
            padding: '24px',
        }}>
            {tabsData.map((tab) => (
                <NavLink style={{
                    textDecoration: 'none',
                    color: '#000',
                }} key={tab.id} to={tab.id}>
                    {({ isActive}) => (
                        <div style={{
                            padding: '12px 24px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: isActive ? 'bold' : 'normal',
                        }}>
                            {tab.title}
                        </div>
                    )}
                </NavLink>
            ))}
        </div>
        <div style={{
            padding: '24px',
        }}>
            <div style={{
                fontWeight: 'bold',
                fontSize: 24
            }}>Here is dynamic component imported from file:</div>
            <Suspense fallback={'Loading...'}>
                {importedComponent}
            </Suspense>
        </div>
    </>)
}
