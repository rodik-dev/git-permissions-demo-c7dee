import { useEffect, useRef } from 'react';
import Image from 'next/image';

const init = Symbol('init');

export type FieldOptions = {
    label: string;
    fieldName: string;
    stackbitType: string;
    stackbitControlType?: string;
    validation?: string;
    value?: any;
};

export function Field({ label, fieldName, stackbitType, stackbitControlType, validation, value }: FieldOptions) {
    const valueRef: any = useRef(init);
    const elmRef = useRef(null);
    const { comparator, renderedValue } = RenderValue(value, fieldName);

    useEffect(() => {
        if (valueRef.current !== init && valueRef.current !== comparator && elmRef.current) {
            (elmRef.current as Element).classList.add('bg-red-100');
            window.setTimeout(() => {
                if (elmRef.current) {
                    (elmRef.current as Element).classList.remove('bg-red-100');
                }
            }, 500);
        }
        valueRef.current = comparator;
    }, [comparator]);

    return (
        <div ref={elmRef} className="transition-colors duration-500">
            <div className="font-bold">{label}</div>
            <ul>
                <li>
                    stackbit type: <span className="font-bold">{stackbitType}</span>
                </li>
                {stackbitControlType ? (
                    <li>
                        stackbit control type: <span className="font-bold">{stackbitControlType}</span>
                    </li>
                ) : null}
                {validation ? (
                    <li>
                        validation: <span className="font-bold">{validation}</span>
                    </li>
                ) : null}
                <li>{renderedValue}</li>
            </ul>
        </div>
    );
}

function RenderValue(value: any, fieldName: string | null, inArray?: boolean): { comparator: string | undefined; renderedValue: JSX.Element } {
    let comparator: string | undefined;
    let renderedValue: JSX.Element;

    if (Array.isArray(value)) {
        return List({ value, fieldName, inArray });
    } else if (typeof value === 'object') {
        if ('secure_url' in value && 'public_id' in value) {
            return Cloudinary({ value, fieldName, inArray });
        } else if ('__typename' in value) {
            return Bynder({ value, fieldName, inArray});
        }
        return NestedObject({ value, fieldName, inArray });
    } else if (typeof value === 'undefined') {
        comparator = undefined;
        const innerValue = <span className="text-orange-800 font-bold">undefined</span>;
        renderedValue = inArray ? innerValue : <span>value: {innerValue}</span>;
    } else if (typeof value === 'boolean') {
        comparator = String(value);
        const innerValue = PrimitiveValue(value, fieldName);
        renderedValue = inArray ? innerValue : <span>value: {innerValue}</span>;
    } else if (typeof value === 'string' && /\.(?:png|jpg|jpeg|svg)$/.test(value.toLowerCase())) {
        comparator = value;
        renderedValue = AssetValue({ value, fieldName, inArray });
    } else {
        comparator = value;
        const innerValue = PrimitiveValue(value, fieldName);
        renderedValue = inArray ? innerValue : <span>value: {innerValue}</span>;
    }

    return {
        comparator,
        renderedValue
    };
}

function List({ value, fieldName, inArray }: { value: any[]; fieldName: string | null; inArray?: boolean }) {
    const comparatorArray: (string | undefined)[] = [];
    const renderedValueArray: JSX.Element[] = [];

    value.forEach((item, index) => {
        const result = RenderValue(item, null, true);
        comparatorArray.push(result.comparator);
        renderedValueArray.push(
            <li key={index} data-sb-field-path={`.${index}`}>
                {result.renderedValue}
            </li>
        );
    });

    const comparator = comparatorArray.join(',');
    const renderedValue = (
        <div>
            <div>{inArray ? '[' : 'value: ['}</div>
            <ul {...fieldPath(fieldName)} style={{ listStyleType: 'disclosure-closed' }}>
                {renderedValueArray}
            </ul>
            <div>]</div>
        </div>
    );

    return { comparator, renderedValue };
}

function NestedObject({ value, fieldName, inArray }: { value: any; fieldName: string | null; inArray?: boolean }) {
    const { type, id, __filePath, __urlPath, __metadata, ...rest } = value;

    const comparatorArray: (string | undefined)[] = [];
    const renderedValueArray: JSX.Element[] = [];

    Object.entries(rest).forEach(([key, value], index) => {
        const result = RenderValue(value, key, true);
        comparatorArray.push(result.comparator);
        renderedValueArray.push(
            <li key={index}>
                {key}: {result.renderedValue}
            </li>
        );
    });

    const comparator = comparatorArray.join(',');
    const renderedValue = (
        <div>
            {inArray ? null : <div>value:</div>}
            <ul {...fieldPath(fieldName)}>
                {(type || __metadata?.modelName) && (
                    <li>
                        type: <span className="text-teal-800 font-bold">{type || __metadata?.modelName}</span>
                    </li>
                )}
                {id || __metadata?.id && (
                  <li>
                      type: <span className="text-teal-800 font-bold">{id || __metadata?.id}</span>
                  </li>
                )}
                {__filePath && (
                    <li>
                        filePath: <span className="text-teal-800 font-bold">{__filePath}</span>
                    </li>
                )}
                {__urlPath && (
                  <li>
                      urlPath: <span className="text-teal-800 font-bold">{__urlPath}</span>
                  </li>
                )}
                {renderedValueArray}
            </ul>
        </div>
    );

    return { comparator, renderedValue };
}

function AssetValue({ value, fieldName, inArray }: { value: any; fieldName: string | null; inArray?: boolean }) {
    return (
        <div>
            {inArray ? null : <div>value:</div>}
            <ul {...fieldPath(fieldName)}>
                <li>
                    url: <span className="text-teal-800 font-bold">{value}</span>
                </li>
                <li>
                    image: <Image src={value} className="m-0" style={{ width: 300 }} width={300} height={200} alt={''} />
                </li>
            </ul>
        </div>
    );
}

function Cloudinary({ value, fieldName, inArray }: { value: any; fieldName: string | null; inArray?: boolean }) {
    const comparator = JSON.stringify(value);
    const renderedValue = (
        <div>
            {inArray ? null : <div>value:</div>}
            <ul {...fieldPath(fieldName)}>
                <li>
                    public_id: <span className="text-teal-800 font-bold">{value.public_id}</span>
                </li>
                <li>
                    url: <span className="text-teal-800 font-bold">{value.secure_url}</span>
                </li>
                <li>
                    image: <Image src={value.secure_url} className="m-0" style={{ width: 300 }} width={300} height={200} alt={''} />
                </li>
            </ul>
        </div>
    );

    return { comparator, renderedValue };
}

function Bynder({ value, fieldName, inArray }: { value: any; fieldName: string | null; inArray?: boolean }) {
    const comparator = JSON.stringify(value);
    const renderedValue = (
        <div>
            {inArray ? null : <div>value:</div>}
            <ul {...fieldPath(fieldName)}>
                <li>
                    name: <span className="text-teal-800 font-bold">{value.name}</span>
                </li>
                <li>
                    url: <span className="text-teal-800 font-bold">{value.files?.webImage?.url}</span>
                </li>
                <li>
                    image: <Image src={value.files?.webImage?.url} className="m-0" style={{ width: 300 }} width={300} height={200} alt={''} />
                </li>
            </ul>
        </div>
    );

    return { comparator, renderedValue };
}

function PrimitiveValue(value: any, fieldName: string | null) {
    const strValue = typeof value === 'string' ? `"${String(value)}"` : String(value);
    const elements = strValue
        .split('\n')
        .reduce(
            (result: (string | JSX.Element)[], item, index, array) =>
                index < array.length - 1 ? result.concat([item, <br key={index} />]) : result.concat(item),
            []
        );
    return (
        <span className="text-orange-800 font-bold px-2 py-1 font-mono" {...fieldPath(fieldName)}>
            {elements}
        </span>
    );
}

function fieldPath(fieldName: string | null) {
    if (!fieldName) {
        return null;
    }
    return { 'data-sb-field-path': `.${fieldName}` };
}
