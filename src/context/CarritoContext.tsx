"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

export interface ItemCarrito {
    id: number;
    tipo: "producto" | "servicio";
    nombre: string;
    precio: number;
    unidad: string;
    imagen: string;
    cantidad: number;
}

interface CarritoContexto {
    items: ItemCarrito[];
    totalItems: number;
    subtotal: number;
    abierto: boolean;
    abrir: () => void;
    cerrar: () => void;
    agregar: (item: Omit<ItemCarrito, "cantidad">) => void;
    cambiarCantidad: (
        tipo: ItemCarrito["tipo"],
        id: number,
        cantidad: number
    ) => void;
    quitar: (tipo: ItemCarrito["tipo"], id: number) => void;
    vaciar: () => void;
    enCarrito: (tipo: ItemCarrito["tipo"], id: number) => boolean;
}

const CLAVE_ALMACENAMIENTO = "carrito-planeamos";
const CANTIDAD_MAXIMA = 1000;

const Contexto = createContext<CarritoContexto | null>(null);

export function CarritoProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [items, setItems] = useState<ItemCarrito[]>([]);
    const [abierto, setAbierto] = useState(false);
    const [hidratado, setHidratado] = useState(false);

    useEffect(() => {
        try {
            const guardado = localStorage.getItem(
                CLAVE_ALMACENAMIENTO
            );
            if (guardado) {
                const datos = JSON.parse(guardado);
                if (Array.isArray(datos)) setItems(datos);
            }
        } catch {
            localStorage.removeItem(CLAVE_ALMACENAMIENTO);
        }
        setHidratado(true);
    }, []);

    useEffect(() => {
        if (!hidratado) return;
        localStorage.setItem(
            CLAVE_ALMACENAMIENTO,
            JSON.stringify(items)
        );
    }, [items, hidratado]);

    const agregar = useCallback(
        (item: Omit<ItemCarrito, "cantidad">) => {
            setItems((actuales) => {
                const existe = actuales.some(
                    (i) => i.id === item.id && i.tipo === item.tipo
                );
                if (existe) {
                    return actuales.map((i) =>
                        i.id === item.id && i.tipo === item.tipo
                            ? {
                                ...i,
                                cantidad: Math.min(
                                    i.cantidad + 1,
                                    CANTIDAD_MAXIMA
                                ),
                            }
                            : i
                    );
                }
                return [...actuales, { ...item, cantidad: 1 }];
            });
        },
        []
    );

    const cambiarCantidad = useCallback(
        (tipo: ItemCarrito["tipo"], id: number, cantidad: number) => {
            const valida = Math.min(
                Math.max(Math.floor(cantidad) || 1, 1),
                CANTIDAD_MAXIMA
            );
            setItems((actuales) =>
                actuales.map((i) =>
                    i.id === id && i.tipo === tipo
                        ? { ...i, cantidad: valida }
                        : i
                )
            );
        },
        []
    );

    const quitar = useCallback(
        (tipo: ItemCarrito["tipo"], id: number) => {
            setItems((actuales) =>
                actuales.filter(
                    (i) => !(i.id === id && i.tipo === tipo)
                )
            );
        },
        []
    );

    const vaciar = useCallback(() => setItems([]), []);

    const valor = useMemo<CarritoContexto>(() => ({
        items,
        totalItems: items.reduce((s, i) => s + i.cantidad, 0),
        subtotal: items.reduce(
            (s, i) => s + i.precio * i.cantidad,
            0
        ),
        abierto,
        abrir: () => setAbierto(true),
        cerrar: () => setAbierto(false),
        agregar,
        cambiarCantidad,
        quitar,
        vaciar,
        enCarrito: (tipo, id) =>
            items.some((i) => i.id === id && i.tipo === tipo),
    }), [items, abierto, agregar, cambiarCantidad, quitar, vaciar]);

    return (
        <Contexto.Provider value={valor}>
            {children}
        </Contexto.Provider>
    );
}

export function useCarrito(): CarritoContexto {
    const contexto = useContext(Contexto);
    if (!contexto) {
        throw new Error(
            "useCarrito debe usarse dentro de CarritoProvider"
        );
    }
    return contexto;
}
