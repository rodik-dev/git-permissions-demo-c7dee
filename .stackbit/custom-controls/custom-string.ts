import type * as StackbitTypes from '@stackbit/types';

const firstNameElm = document.getElementById('firstName') as HTMLInputElement;
const lastNameElm = document.getElementById('lastName') as HTMLInputElement;
const moodContainerElm = document.getElementById('moodContainer') as HTMLDivElement;

const initialContextWindow = window as unknown as StackbitTypes.CustomControlWindow;
// create object if page script loads before control
initialContextWindow.stackbit = initialContextWindow.stackbit || {};

initialContextWindow.stackbit.onUpdate = (options: StackbitTypes.OnUpdateOptions) => {
    console.log('onUpdate, options:', options);

    const docStringField = options.documentField as StackbitTypes.DocumentJsonFieldNonLocalized | undefined;
    const value = docStringField?.value ?? {};

    let selectedMoodElm = getMoodElementFromText(value?.mood);
    if (selectedMoodElm) {
        selectedMoodElm.classList.add('selected');
    }

    firstNameElm.value = value.firstName ?? '';
    lastNameElm.value = value.lastName ?? '';


    if (options.init) {
        const update = function () {
            options
                .updateDocument({
                    operations: [
                        {
                            opType: 'set',
                            fieldPath: options.fieldPath,
                            field: {
                                type: 'string',
                                value: {
                                    ...(firstNameElm.value ? { firstName: firstNameElm.value } : null),
                                    ...(lastNameElm.value ? { lastName: lastNameElm.value } : null),
                                    ...(selectedMoodElm ? { mood: selectedMoodElm.innerText } : null)
                                }
                            }
                        }
                    ]
                })
                .then((result) => {
                    console.log('saved, result:', result);
                })
                .catch((err) => {
                    console.log(`Error ${err}`);
                });
        };

        firstNameElm.addEventListener('change', update);
        lastNameElm.addEventListener('change', update);
        moodContainerElm.addEventListener('click', (event) => {
            if (event.target && 'classList' in event.target && (event.target as HTMLDivElement).classList.contains('mood')) {
                if (selectedMoodElm !== null) {
                    selectedMoodElm.classList.remove('selected');
                }
                if (event.target === selectedMoodElm) {
                    selectedMoodElm = null;
                    update();
                } else {
                    selectedMoodElm = event.target as HTMLDivElement;
                    selectedMoodElm.classList.add('selected');
                    update();
                }
            }
        });

        // options.setDesiredControlSize({ height: 400 });
    }
};

function getMoodElementFromText(text: string): HTMLDivElement | null {
    if (!text) {
        return null;
    }
    for (let i = 0; i < moodContainerElm.childNodes.length; i++) {
        const moodElm = moodContainerElm.childNodes[i] as HTMLDivElement;
        if (moodElm.innerText === text) {
            return moodElm;
        }
    }
    return null;
}
