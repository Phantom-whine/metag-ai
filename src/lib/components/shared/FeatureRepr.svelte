<script>
    import FeatureHead from "./FeatureHead.svelte";
</script>
<FeatureHead id='features' title='DISCOVER OUR FEATURE SET' description='Explore the rich array of features that empower our platform to meet your unique needs.'/>
<div class="p-6 md:p-12 lg:p-16 w-[95%] mx-auto rounded-[50px] mt-4 flot" style="background-color: #ccfc7e;">
    <div class="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div class="space-y-6">
            <h1 class="text-black text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight flot-b">
                Repurpose  
                <br>
                Any Content
            </h1>
            <p class="text-lg md:text-xl max-w-xl text-black flot">
                Convert ideas, YouTube videos, & blogs into LinkedIn posts instantly.
            </p>
        </div>

        <div class="w-full max-w-3xl mx-auto">
            <div class="bg-white rounded-3xl p-4 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
                    <!-- Source Content Column -->
                    <div class="space-y-4 slide-in" style="animation-delay: 0.1s;">
                        <h3 class="font-semibold text-sm text-gray-500 mb-4 flex items-center">
                            <span class="mr-2">SOURCE</span>
                            <span class="px-2 py-1 bg-gray-100 rounded-full text-xs">Input</span>
                        </h3>
                        <div class="space-y-4">
                            <div class="bg-red-100 p-4 rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer">
                                <div class="text-red-600 font-medium mb-2 flex items-center justify-between">
                                    <span>Youtube</span>
                                    <span class="text-xs bg-red-200 px-2 py-1 rounded-full">URL</span>
                                </div>
                                <div class="w-full h-2 bg-red-200 rounded-full">
                                    <div class="w-2/3 h-2 bg-red-500 rounded-full transition-all duration-500"></div>
                                </div>
                            </div>
    
                            <div class="bg-blue-100 p-4 rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer">
                                <div class="text-blue-600 font-medium mb-2 flex items-center justify-between">
                                    <span>Blog Post</span>
                                    <span class="text-xs bg-blue-200 px-2 py-1 rounded-full">URL</span>
                                </div>
                                <div class="w-full h-2 bg-blue-200 rounded-full">
                                    <div class="w-1/2 h-2 bg-blue-500 rounded-full transition-all duration-500"></div>
                                </div>
                            </div>
    
                            <div class="bg-green-100 p-4 rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer">
                                <div class="text-green-600 font-medium mb-2 flex items-center justify-between">
                                    <span>Topic</span>
                                    <span class="text-xs bg-green-200 px-2 py-1 rounded-full">Text</span>
                                </div>
                                <div class="w-full h-2 bg-green-200 rounded-full">
                                    <div class="w-1/2 h-2 bg-green-500 rounded-full transition-all duration-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <!-- Arrow Column -->
                    <div class="flex items-center justify-center py-4 md:py-0 slide-in" style="animation-delay: 0.2s;">
                        <div class="rotate-90 md:rotate-[-90] w-16 h-16 rounded-2xl bg-black p-2 flex items-center justify-center transform transition-transform duration-500">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </div>
                    </div>
    
                    <!-- Output Content Column -->
                    <div class="space-y-4 slide-in" style="animation-delay: 0.3s;">
                        <h3 class="font-semibold text-sm text-gray-500 mb-4 flex items-center">
                            <span class="mr-2">OUTPUT</span>
                            <span class="px-2 py-1 bg-gray-100 rounded-full text-xs">Generated</span>
                        </h3>
    
                        <div class="space-y-4">
    
                            <div class="bg-blue-500/10 p-4 rounded-xl">
                                <div class="text-blue-600 font-medium mb-2 flex items-center justify-between">
                                    <span>LinkedIn Post</span>
                                    <!-- <span class="text-xs bg-blue-200 px-2 py-1 rounded-full animate-pulse">Converting</span> -->
                                </div>
                                <div class="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                                    <div class="w-full h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="mt-8 pt-6 border-t border-gray-100">
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-gray-500">
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-green-500"></div>
                            <span>AI Processing</span>
                            <span class="ml-2 px-2 py-1 bg-green-100 rounded-full text-xs text-green-600">Active</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full animate-pulse bg-blue-500"></div>
                            <span>Real-time conversion</span>
                            <span class="ml-2 px-2 py-1 bg-blue-100 rounded-full text-xs text-blue-600">In Progress</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<style>
     @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .slide-in {
            animation: slideIn 0.5s ease-out forwards;
        }
</style>