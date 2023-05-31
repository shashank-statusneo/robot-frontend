import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    result : {},
    policy_detail: [],
    simulation_output: []
}

export const algorithmDataReducer = createSlice({
    name: 'algorithmReducer',
    initialState,
    reducers: {
        postAlgorithmApi(state, action){
            return {
                ...state,
                isLoading: true
            }
        },
        postAlgorithmApiSuccess(state, action){
            console.log('hi')
            console.log(action?.payload?.data?.result)

            return {
                ...state,
                result: action?.payload?.data?.result,
                policy_detail: action?.payload?.data?.policy_detail,
                simulation_output: action?.payload?.data?.simulation_output,
                isLoading: true
            }
        },
        postAlgorithmApiFailed(state, action){
            return {
                ...state,
                message: 'Algorithm API Failed',
                isLoading: false
            }
        }

    }

})

export const {
    postAlgorithmApi,
    postAlgorithmApiSuccess,
    postAlgorithmApiFailed
} = algorithmDataReducer.actions

export default algorithmDataReducer.reducer